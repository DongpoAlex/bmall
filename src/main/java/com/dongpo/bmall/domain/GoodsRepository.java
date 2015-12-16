package com.dongpo.bmall.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by AlexBob on 2015/12/16.
 */
@RepositoryRestResource(path="goods")
public interface GoodsRepository extends Repository<Goods, Integer> {
    Page<Goods> findAll(Pageable pageable);
}
