package com.dongpo.bmall.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by AlexBob on 2016/1/27.
 */
@RepositoryRestResource(path = "favoritesGoods")
public interface FavoritesGoodsRepository extends CrudRepository<FavoritesGoods,Integer> {
}
