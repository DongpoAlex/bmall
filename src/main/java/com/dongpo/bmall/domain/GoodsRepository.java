package com.dongpo.bmall.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 * Created by AlexBob on 2015/12/16.
 */
@RepositoryRestResource(path="goods")
public interface GoodsRepository extends PagingAndSortingRepository<Goods, Integer> {

    @RestResource(path = "/byGuest")
    Page<Goods> findByGuestId(@Param("guestId") String guestId, Pageable var1);

    @RestResource(path = "/byGoodsId")
    Goods findByGoodsIdAndGuestId(@Param("goodsId") int goodsId,@Param("guestId") String guestId);

    @RestResource(path = "/byDeptId")
    Page<Goods> findByTwoDeptIdAndGuestId(@Param("deptId") int deptId,@Param("guestId") String guestId,Pageable var1);



}
